package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type ToDolist struct {
	ID     primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Tarefa string             `json:"_tarefa,omitempty"`
	Status bool               `json:"_status,omitempty"`
}
