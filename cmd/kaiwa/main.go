package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
)
var port string

func init() {
	flag.StringVar(&port, "port", "8080", "-port=8081")
}

func main() {
	flag.Parse()
	log.SetFlags(0)
	http.HandleFunc("/", handler)
	log.Printf("Running server at port %s", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", port), nil))
}

func handler(w http.ResponseWriter, r *http.Request) {
	u := websocket.Upgrader{}
	u.CheckOrigin = func(r *http.Request) bool {
		return true
	}
	c, err := u.Upgrade(w, r, nil)
	if err != nil {
		log.Print(err)
	}
	defer c.Close()
	for {
		msgType, msg, err := c.ReadMessage()
		if err != nil {
			log.Print(err)
			continue
		}
		fmt.Printf("Message: %s\n", string(msg))
		// data,err := json.Marshal(msg)
		// if err != nil {
		// 	log.Print(err)
		// 	continue
		// }
		now := time.Now().String()
		err = c.WriteMessage(msgType, []byte(now + " Alwin's Time"))
		if err != nil {
			log.Print(err)
			continue
		}
	}
}