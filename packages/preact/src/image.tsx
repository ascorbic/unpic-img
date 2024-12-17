import { transformProps, UnpicImageProps } from "@unpic/core";
import { JSX } from "preact";
import { UnSignal } from ".";

type ImgPropsWithoutSignals = UnSignal<JSX.HTMLAttributes<HTMLImageElement>>;

export type ImageProps = UnpicImageProps<ImgPropsWithoutSignals>;

export function Image(props: ImageProps) {
  return (
    <img
      {...transformProps<
        ImgPropsWithoutSignals,
        ImgPropsWithoutSignals["style"]
      >(props)}
    />
  );
}
