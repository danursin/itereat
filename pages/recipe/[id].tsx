import { GetStaticPaths, GetStaticPathsContext, GetStaticProps, GetStaticPropsResult } from "next";
import React, { useEffect, useState } from "react";

import { Header } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import { Recipe as RecipeType } from "../../types";
import { getKnex } from "../../db";

interface RecipeProps {
 recipe: RecipeType;
}

const Recipe: React.FC<RecipeProps> = ({ recipe}) => {

    if(!recipe){
        return <p>There is no recipe there</p>
    }
    const date_created = new Date(recipe.date_created);
    return <Layout>
        <Header content={recipe.title} subheader={`Created ${date_created.toLocaleString()}`}/>
    </Layout>;
};

export default Recipe;

export const getStaticProps: GetStaticProps<RecipeProps> = async (context): Promise<GetStaticPropsResult<RecipeProps>> => {
    const knex = getKnex();
    const id = +(context.params?.id ?? 0);
    if(!id){
        throw new Error("Unable to get id");
    }
    const recipes = await knex<RecipeType>("Recipe").withSchema("ie").where({ id });
    const [recipe] = recipes;
    recipe.date_created = (recipe.date_created as Date).toISOString();
    return {
        props: {
            recipe       
        }
    };
};

export const getStaticPaths: GetStaticPaths = (content: GetStaticPathsContext) => {
    return {
        fallback: true,
        paths: [
            "/recipe/id"
        ]
    };
};