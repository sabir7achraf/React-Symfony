<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

class UserController extends AbstractController
{
private $security;

public function __construct(Security $security)
{
$this->security = $security;
}


#[Route("/api/user", name:"api_user", methods:"GET")]


public function getUserInfo(): JsonResponse
{
$user = $this->security->getUser();

if (!$user) {
return new JsonResponse(['error' => 'User not authenticated'], 401);
}

$userData = [
'name' => $user->getWholeName(),
'email' => $user->getUserIdentifier(),
'bio' => $user->getBio(),
];
return new JsonResponse($userData);
}
}
