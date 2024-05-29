<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AuthController extends AbstractController
{
#[Route('/api/login_check', name: 'api_login_check')]
public function login(
Request $request,
UserProviderInterface $userProvider,
UserPasswordHasherInterface $passwordHasher,
JWTTokenManagerInterface $JWTManager
): JsonResponse {
$requestContent = json_decode($request->getContent(), true);

$email = $requestContent['email'] ?? '';
$password = $requestContent['password'] ?? '';

try {
$user = $userProvider->loadUserByIdentifier($email);
if (!$user || !$passwordHasher->isPasswordValid($user, $password)) {
throw new AuthenticationException('Invalid credentials.');
}
} catch (AuthenticationException $e) {
return new JsonResponse(['error' => $e->getMessage()], JsonResponse::HTTP_UNAUTHORIZED);
}

return new JsonResponse(['token' => $JWTManager->create($user)]);
}
}
