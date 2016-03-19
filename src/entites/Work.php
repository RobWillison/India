<?php

namespace India\Entites;

use SQLite3;

class Work {

	private $db;

	public function __construct()
	{
		$this->db = new SQLite3('../data/site.db');
	}

	public function getAll()
	{
		$stmt = $this->db->prepare('SELECT * FROM workPiece');

		$result = $stmt->execute();
		$workPieces = [];

		while ($pageData = $result->fetchArray()) {
			$title = $pageData['name'];
			$image = $pageData['image'];
			$link = 'page/' . $pageData['id'];

			$workPieces[] = ['src' => $image, 'link' => $link, 'title' => $title];
		}

		return $workPieces;
	}

	public function getById($id)
	{
		$stmt = $this->db->prepare('SELECT * FROM workPiece WHERE id = :id');

		$stmt->bindValue(':id', $id, SQLITE3_INTEGER);

		$result = $stmt->execute();
		$pageData = $result->fetchArray();

		$title = $pageData['name'];
		$image = '../' . $pageData['image'];
		$content = $pageData['content'];


		return [
			'title' => $title,
			'image' => $image,
			'content' => $content,
		];
	}
}
