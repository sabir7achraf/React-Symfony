<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AdminFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $user=new User();
        $user->setWholeName("admin");
        $user->setEmail("admin@admin.com");
        $user->setPassword("admin");
        $user->setRoles(["ROLE_ADMIN"]);
         $manager->persist($user);

        $manager->flush();
    }
}
