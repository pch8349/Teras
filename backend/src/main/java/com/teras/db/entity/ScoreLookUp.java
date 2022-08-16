package com.teras.db.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.teras.db.embeddedId.ScoreId;

import lombok.Data;
import lombok.Getter;



@Entity
@Getter
@Table(name = "scoreLookUp")
public class ScoreLookUp {
	@EmbeddedId
	ScoreId scoreId;
	
	@Column(name = "score", nullable = false)
    int score;
}
