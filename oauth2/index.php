<?php
header('Content-type: text/plain; charset=utf-8');
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

include "../vendor/autoload.php";
use AmoCRM\{AmoAPI, AmoAPIException};
use AmoCRM\TokenStorage\{FileStorage, TokenStorageException};

try {
    // Параметры авторизации по протоколу oAuth 2.0
    $clientId     = '63649a45-b5e1-4369-80d6-7a521a86d03d';
    $clientSecret = 'ckXcOTX9KvYo5mdiJtvQgpltNPnY7cpvKBKzGoKcuLefcQwX0aNtdxsTtPou0BqZ';
    $authCode     = 'def50200d62a209147453ee7a036c4a85ef67a4f63877694f647249277d59da4a33ef34fa32bc9dc4a97c955cb92ee7d4b89d30b653c0626dcc1baa78b5552424fc03e086058cc85b52f0b177c368a2fa3167668cafab521e2c00d9484f0fed4f7fd5856bc00e816a6639463acbe70b3a58f8a9624a005ce62fd9545adabd8b1aa81066ab774251b32732b59312f0d252dd61d9fedd5ba81a76922ccce1f09770f7486716932f27e3ca9c20984125f13f4af588b6641d1fc796554e2bf11fb507b7ad0a7b4f67cf0bfeb79d98f4eccd7e51e1534a8100bc2b76189980e488c6b46ab64dd1ad85fdac7b1765ed6b2f49f4ef1d73729c5ed236967f4596994271e8adfe4d2d23a7b9d05c75dda57eacce1ac494d0eed333a10178663c7a8a59217be3cda50bd525a8371ce1f6f695c9365eb05143c195ce778f382bc3103824ff217ce2673c9eac70e985530cd3d95d5ae090916f4a841aa4eb50a50b8f36621cae01cbf16c9eca8fee823fae30af9102215f846a08c98203b850681404219b3f2d6e3770003c770836907af373f4ef26ef21269821d48e4fc6e8f4cf69b999140c68da7b2ffc0cd5f663f2d017e125805b3b5849d2a9038be3826a35c690091c8ce644fbe502cbf0465f5865996153ffb57a4';
    $redirectUri  = 'https://work-web.space/banika/oauth2/';
    $subdomain    = 'oogleandrey';

    $domain = AmoAPI::getAmoDomain($subdomain);
    $isFirstAuth = !(new FileStorage())->hasTokens($domain);

    if ($isFirstAuth) {
        // Первичная авторизация
        AmoAPI::oAuth2($subdomain, $clientId, $clientSecret, $redirectUri, $authCode);
    } else {
        // Последующие авторизации
        AmoAPI::oAuth2($subdomain);
    }

    // Получение информации об аккаунте вместе с пользователями и группами
    echo "<pre>";
    // print_r(AmoAPI::getAccount($with = 'users,groups'));
    print_r(AmoAPI::getAccount($with = 'custom_fields'));
    echo "</pre>";
} catch (AmoAPIException $e) {
    printf('Ошибка авторизации (%d): %s' . PHP_EOL, $e->getCode(), $e->getMessage());
} catch (TokenStorageException $e) {
    printf('Ошибка обработки токенов (%d): %s' . PHP_EOL, $e->getCode(), $e->getMessage());
}