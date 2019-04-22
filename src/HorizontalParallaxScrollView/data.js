// @flow

import { Image } from "react-native";

export type SlideOptions = {|
  imageSource: { uri: string },
  title: string
|};

export const images: Array<SlideOptions> = [
  {
    imageSource: {
      uri:
        "https://user-images.githubusercontent.com/4661784/56497396-09322080-6506-11e9-9e29-c3aec47ebecc.jpg"
    },
    title: "by Helena Yankovska"
  },
  {
    imageSource: {
      uri:
        "https://user-images.githubusercontent.com/4661784/56497397-09322080-6506-11e9-9d54-03b897d9b956.jpg"
    },
    title: "by Daniel Horvath"
  },
  {
    imageSource: {
      uri:
        "https://user-images.githubusercontent.com/4661784/56497399-09322080-6506-11e9-9cf4-4748d2c384ba.jpg"
    },
    title: "by Karly Gomez"
  },
  {
    imageSource: {
      uri:
        "https://user-images.githubusercontent.com/4661784/56497400-09cab700-6506-11e9-9fca-b643430f955c.jpg"
    },
    title: "by Whitney Wright"
  },
  {
    imageSource: {
      uri:
        "https://user-images.githubusercontent.com/4661784/56497402-09cab700-6506-11e9-8724-6138682b9059.jpg"
    },
    title: "by Melissa Walker Horn"
  },
  {
    imageSource: {
      uri:
        "https://user-images.githubusercontent.com/4661784/56497404-0a634d80-6506-11e9-894b-06bde6b05afe.jpg"
    },
    title: "by Cody Chan"
  }
];

images.forEach(e => Image.prefetch(e.imageSource.uri));
