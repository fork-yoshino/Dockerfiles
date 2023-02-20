<?php

declare(strict_types=1);

$config = new PhpCsFixer\Config();

return $config
    ->setRiskyAllowed(true)
    ->setRules([
        // ルールを追記
        '@PSR12' => true,
        'declare_strict_types' => true,
    ])
    ->setFinder(PhpCsFixer\Finder::create()
    ->exclude([
            // 除外ファイルを追記
            'vendor'
        ])
        ->in(__DIR__)
    )
;
