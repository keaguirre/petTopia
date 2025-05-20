import { useEffect, useRef } from "react";
import Phaser from "phaser";
import MainScene from "../game/scenes/MainScene";
import MuebleEditorScene from "../game/scenes/MuebleEditorScene";

export default function GameCanvas() {
  const gameRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const pj = "cat"; // personaje fijo para test
    const isEditor = window.location.search.includes("editor");

    const game = new Phaser.Game({
      type: Phaser.AUTO,
      width: 448,
      height: 320,
      zoom: 1.7,
      parent: "phaser-container",
      backgroundColor: "#1e1e1e",
      scene: isEditor ? [MuebleEditorScene] : [MainScene],
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
          debug: false,
        },
      },
      callbacks: {
        postBoot: () => {
          game.registry.set("pj", pj);
        },
      },
    });

    gameRef.current = game;

    return () => {
      gameRef.current?.destroy(true);
    };
  }, []);

  return <div id="phaser-container" style={{ width: "100%", height: "100%" }} />;
}
