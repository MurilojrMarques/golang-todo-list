import React, { Component } from "React";
import axios from "axios";
import { Card, Header, Form, Input, Icon } from "semantic-ui-react";

let endpoint = "http://localhost:9000"

class ToDoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            task: "",
            items: []
        };
    }
    componentDidMount() {
        this.getTask();
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    onSubmit = () => {
        let { task } = this.state;

        if (task) {
            axios.post(endpoint + "/api/task",
                { task, },
                {
                    hearders: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                }
            ).then((res) =>{
                this.getTask();
                this.setState({
                    task:"",
                });
                console.log(res);
            });
        }
    };

    getTask = () => {
        axios.get(endpoint + "/api/tasks").then((res) => {
            if (res.data) {
                this.setState({
                    items: res.data.map((item) => {
                        let color = "yellow";
                        let style = {
                            wordWrap: "break-word"
                        };

                        if (item.status) {
                            color = "green";
                            style["textDecorationLine"] = "line-through";
                        }
                        return (
                            <Card key={item._id} color={color} fluid className="rough">
                                <Card.Content>
                                    <Card.Header textAlign="left">
                                        <div style={style}>{item.task}</div>
                                    </Card.Header>
                                    <Card.Meta textAlign="right">
                                        <Icon
                                            name="check circle"
                                            color="blue"
                                            onClick={() => this.updateTask(item._id)}
                                        />
                                        <span style={{ paddingRight: 10 }}>Desfazer</span>
                                        <Icon
                                            name="delete"
                                            color="red"
                                            onClick={() => this.deleteTask(item._id)}
                                        />
                                        <span style={{ paddingRight: 10 }}>Deletar</span>
                                    </Card.Meta>
                                </Card.Content>
                            </Card>
                        );
                    }),
                });
            } else {
                this.setState({
                    items: [],
                });
            }
        });
    };

    updateTask = (id) => {
        axios.put(endpoint + "/api/task" + id, {
            hearders: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
        }).then((res) => {
            console.log(res);
            this.getTask();
        });
    }

    undoTask = (id) => {
        axios.put(endpoint + "/api/undoTask" + id, {
            hearders: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
        }).then((res) => {
            console.log(res);
            this.getTask();
        });
    };

    deleteTask = (id) => {
        axios.delete(endpoint + "/api/deleteTask" + id, {
            hearders: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
        }).then((res) => {
            console.log(res);
            this.getTask();
        });
    };

    render() {
        return (
            <div>
                <div>
                    <Header className="header" as="h2" color="yellow">
                        Lista de Tarefas
                    </Header>
                </div>
                <div className="row">
                    <Form onSubmit={this.onSubmit}>
                        <Input
                            type="text"
                            name="task"
                            onChange={this.onChange}
                            value={this.state.task}
                            fluid
                            placeholder="Criar Tarefa"
                        />
                        {/*<Button> Criar Tarefa</Button>*/}
                    </Form>
                </div>
                <div className="row">
                    <Card.Group>{this.state.items}</Card.Group>
                </div>
            </div>
        );
    }
}

export default ToDoList;