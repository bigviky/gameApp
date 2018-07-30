package com.gameApp.repository;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.gameApp.model.Game;

@Transactional
@Repository
public interface GameRepository extends JpaRepository<Game, Long>  {


    @Query("select g from Game g where LOWER(g.title) LIKE LOWER(CONCAT('%',:title, '%'))")
	Page<Game> findByTitle(@Param("title") String title, Pageable pageRequest);
	
}
