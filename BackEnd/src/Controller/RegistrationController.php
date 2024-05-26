<?php
namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationFormType;
use App\Security\EmailVerifier;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mime\Address;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Contracts\Translation\TranslatorInterface;
use SymfonyCasts\Bundle\VerifyEmail\Exception\VerifyEmailExceptionInterface;

class RegistrationController extends AbstractController
{
private EmailVerifier $emailVerifier;
private HttpClientInterface $httpClient;

public function __construct(EmailVerifier $emailVerifier, HttpClientInterface $httpClient)
{
$this->emailVerifier = $emailVerifier;
$this->httpClient = $httpClient;
}

#[Route('/register', name: 'app_register', methods: ['POST'])]
public function register(Request $request, UserPasswordHasherInterface $userPasswordHasher, EntityManagerInterface $entityManager): Response
{
$requestData = json_decode($request->getContent(), true);
$email = $requestData['email'] ?? null;
$plainPassword = $requestData['password'] ?? null;

if (!$email || !$plainPassword) {
return new JsonResponse(['error' => 'Email and password must be provided.'], JsonResponse::HTTP_BAD_REQUEST);
}

$user = new User();
$user->setEmail($email);
$user->setPassword(
$userPasswordHasher->hashPassword(
$user,
$plainPassword
)
);

$entityManager->persist($user);
$entityManager->flush();

// Send email confirmation (if required)
$this->emailVerifier->sendEmailConfirmation('app_verify_email', $user,
(new TemplatedEmail())
->from(new Address('sabirachraf032@gmail.com', 'Sabiiiiiir'))
->to($user->getEmail())
->subject('Please Confirm your Email')
->htmlTemplate('registration/confirmation_email.html.twig')
);

// Now try to log in the user
$response = $this->httpClient->request(
'POST',
'http://localhost:8000/api/login_check',
[
'json' => [
'email' => $email,
'password' => $plainPassword
]
]
);

if ($response->getStatusCode() !== 200) {
return new JsonResponse(['error' => 'Registration successful, but login failed.'], JsonResponse::HTTP_BAD_REQUEST);
}

$data = $response->toArray();

return new JsonResponse($data);
}

#[Route('/verify/email', name: 'app_verify_email')]
public function verifyUserEmail(Request $request, TranslatorInterface $translator): Response
{
$this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

try {
$this->emailVerifier->handleEmailConfirmation($request, $this->getUser());
} catch (VerifyEmailExceptionInterface $exception) {
$this->addFlash('verify_email_error', $translator->trans($exception->getReason(), [], 'VerifyEmailBundle'));

return $this->redirectToRoute('app_register');
}

$this->addFlash('success', 'Your email address has been verified.');

return $this->redirectToRoute('app_register');
}
}
