import React from "react";
import { Composition } from "remotion";
import { KineticText, kineticTextDefaultProps } from "./compositions/KineticText";
import { ProductSpotlight, productSpotlightDefaultProps } from "./compositions/ProductSpotlight";
import { UGCHook, ugcHookDefaultProps } from "./compositions/UGCHook";

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="UGCHook"
        component={UGCHook}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={ugcHookDefaultProps}
      />
      <Composition
        id="ProductSpotlight"
        component={ProductSpotlight}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={productSpotlightDefaultProps}
      />
      <Composition
        id="KineticText"
        component={KineticText}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={kineticTextDefaultProps}
      />
    </>
  );
};
