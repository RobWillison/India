<?php

switch ($_SERVER['REDIRECT_SCRIPT_URL']) {
  case '/admin':
    require __DIR__ . '/src/app/admin/admin.php';
    break;
  default:
    include __DIR__ . '/src/view/home.html';
    break;
}
