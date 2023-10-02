import "./App.css";
import { Head } from "@impalajs/preact/head";
import { FunctionComponent } from "preact";

interface AppProps {
  title: string;
}

export const App: FunctionComponent<AppProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </>
  );
};
