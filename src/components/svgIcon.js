import React, { Component } from "react";

import GameControllerSVG from "../assets/svgs/game-controller";
import HomeUserSVG from "../assets/svgs/home-user";
import TechnologySVG from "../assets/svgs/video-consultation";

function getIcon(iconName) {
  switch (iconName) {
    case "home-user":
      return <HomeUserSVG />;
    case "video-consultation":
      return <TechnologySVG />;
    case "game-controller":
      return <GameControllerSVG />;
    default:
      return null;
  }
}

export default class SvgIcon extends Component {
  render() {
    const { iconName } = this.props;
    return <>{getIcon(iconName)}</>;
  }
}
