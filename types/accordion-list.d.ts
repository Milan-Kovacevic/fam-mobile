/// <reference types="node" />
/// <reference types="react"/>
/// <reference types="react-native"/>

declare module "react-native-collapsible/Accordion" {
  import { ComponentType } from "react";
  import { FlatListProps } from "react-native";

  interface AccordionProps<T>
    extends Omit<FlatListProps<T>, "data" | "renderItem"> {
    activeSections: number[];
    sections: T[];
    renderSectionTitle?: () => ReactNode;
    containerStyle?: object;
    sectionContainerStyle?: object;
    renderAsFlatList?: boolean;
    touchableComponent?: ComponentType<any>;
    touchableProps?: object;
    renderHeader: (content: T) => ReactNode;
    renderContent: (content: T) => ReactNode;
    onChange?: (indexes: number[]) => void;
  }

  export default class Accordion<T> extends React.Component<
    AccordionProps<T>
  > {}
}
