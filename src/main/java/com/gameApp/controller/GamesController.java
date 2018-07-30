package com.gameApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.gameApp.model.Game;
import com.gameApp.service.GameService;

@RestController
public class GamesController {
	
	@Autowired
	GameService gameService;

	@GetMapping(value = "/games/{page}")
	public Page<Game> getGames(@PathVariable(value = "page") int page) {
		return gameService.getGameList(new PageRequest(page, 20, Sort.Direction.ASC, "score"));
	}
	
	@GetMapping(value = "/games/{name}/{page}")
	public Page<Game> getGamesByName(@PathVariable(value = "name") String name, @PathVariable(value = "page") int page) {
		return gameService.getGameListByName(name, new PageRequest(page, 20, Sort.Direction.ASC, "score"));
	}
	
	
	@GetMapping(value = "/games/sortBy/platform/{page}/{order}")
	public Page<Game> getGamesSortByPlatform(@PathVariable(value = "page") int page, @PathVariable(value = "order") int order) {
		return gameService.getGameList(new PageRequest(page, 20, order == 1 ? Sort.Direction.ASC : Sort.Direction.DESC, "platform"));
	}
}
