package com.gameApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.gameApp.model.Game;
import com.gameApp.repository.GameRepository;

@Service
public class GameServiceImpl implements GameService {

	@Autowired
	GameRepository gameRepo;
	
	@Override
	public Page<Game> getGameList(PageRequest pageRequest) {
		Page<Game> games = gameRepo.findAll(pageRequest);
		return games;
	}

	@Override
	public Page<Game> getGameListByName(String name, PageRequest pageRequest) {
		Page<Game> games = gameRepo.findByTitle(name, pageRequest);
		return games;
	}

}
