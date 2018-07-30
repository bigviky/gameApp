package com.gameApp.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import com.gameApp.model.Game;

public interface GameService {
	Page<Game> getGameList(PageRequest pageRequest);

	Page<Game> getGameListByName(String name, PageRequest pageRequest);
}
