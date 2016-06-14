<?php

namespace India\DAO;

use SQLite3;

class Work {

	private $db;

	public function __construct()
	{
		$this->db = new SQLite3('../data/site.db');
	}

	public function getAll()
	{
		$stmt = $this->db->prepare('SELECT * FROM workPiece ORDER BY id DESC');

		$result = $stmt->execute();
		$workPieces = [];

		while ($pageData = $result->fetchArray()) {
			$title = $pageData['name'];
			$image = $pageData['logo'];
			$imageHover = $pageData['logoHover'];
			$content = $pageData['content'];
			$link = 'page/' . $pageData['id'];

			$workPieces[] = ['src' => $image, 'srcHover' => $imageHover, 'link' => $link, 'title' => $title, 'content' => $content, 'hover' => false];
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

	public function addNew($name, $image, $content) {
		$stmt = $this->db->prepare(
			'INSERT INTO workPiece (name, image, content) VALUES :name, :image, :content'
		);

		$stmt->bindValue(':name', $name, SQLITE3_TEXT);
		$stmt->bindValue(':image', $image, SQLITE3_TEXT);
		$stmt->bindValue(':content', $content, SQLITE3_TEXT);

		$result = $stmt->execute();
	}
}
