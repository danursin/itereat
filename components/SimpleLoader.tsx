import { Header, Icon } from "semantic-ui-react";

import React from "react";

interface SimpleLoaderProps {
    content?: React.ReactNode;
}

const SimpleLoader: React.FC<SimpleLoaderProps> = ({ content }) => {
    return <Header color="grey" icon={<Icon name="cog" loading />} content={content ?? "Loading..."}/>;
};

export default SimpleLoader;
