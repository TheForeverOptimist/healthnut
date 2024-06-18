import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function callbackHandler(req: NextApiRequest, res: NextApiResponse){
    const session = await getSession({req});

    if(session){
        //lets redirect to the dashboard if authentication is successful
        res.redirect('/dashboard');
    }else{
        //redirect back to homepage
        res.redirect('/')
    }
}