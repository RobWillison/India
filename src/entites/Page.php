<?php

namespace India\Entites;

use SQLite3;

class Page {

  private $db;

  public function __construct()
  {
    $this->db = new SQLite3('../data/site.db');
  }

  public function getAll()
  {
    $stmt = $this->db->prepare('SELECT * FROM page');

    $result = $stmt->execute();
    $pages = [];

    while ($pageData = $result->fetchArray()) {
    	$title = $pageData['name'];
    	$image = $pageData['image'];
    	$content = $pageData['content'];

    	$pages[$pageData['id']] = ['title' => $title, 'src' => $image, 'content' => $content];
    }

    return $pages;

  }
}
