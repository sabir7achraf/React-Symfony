<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class ApiController extends AbstractController
{
    #[Route('/api/data', name: 'api_data')]
    public function getData(): JsonResponse
    {
        $data = [
            'message' => 'Hello from Symfony!',
            'date' => (new \DateTime())->format('Y-m-d H:i:s')
        ];
        return new JsonResponse($data);
    }
}
