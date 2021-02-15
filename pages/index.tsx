import { GetStaticProps, GetStaticPropsResult } from "next";
import { Header, List, Message } from "semantic-ui-react";

import Layout from "../components/Layout";
import React from "react";
import { Recipe } from "../types";
import { getKnex } from "../db";

interface HomeProps {
    recipes: Recipe[];
}

const Home: React.FC<HomeProps> = ({ recipes }) => {
    return (
        <Layout>
            <Header content="Recipes" />
            {!recipes.length && <Message content="No recipes yet!" icon="info circle" color="orange" />}
            {!!recipes.length && (
                <List divided celled link>
                    {recipes.map(({ id, title }) => {
                        return <List.Item key={id} content={title} />;
                    })}
                </List>
            )}
        </Layout>
    );
};

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async (context): Promise<GetStaticPropsResult<HomeProps>> => {
    const knex = getKnex();
    const recipes = await knex<Recipe>("Recipe").withSchema("ie").orderBy("Title");
    return {
        props: {
            recipes
        }
    };
};
