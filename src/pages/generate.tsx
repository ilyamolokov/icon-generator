import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import { Button } from "~/components/Button";
import { FormGroup } from "~/components/FormGroup";
import { Input } from "~/components/Input";
import { api } from "~/utils/api";

const GeneratePage: NextPage = () => {
    const [form, setForm] = useState({
        prompt: ''
    })

    const session = useSession()

    const isLoggedIn = !!session.data

    const generateIcon = api.generate.generateIcon.useMutation({
        onSuccess(data) {
            console.log('mutation finished', data)
        }
    })

    const updateForm = (key: string) => {
        return function(e: React.ChangeEvent<HTMLInputElement>) {
            setForm((prev)=>
                ({ 
                    ...prev, 
                    [key]: e.target.value 
                })
            )
        }
    }
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        generateIcon.mutate({
            prompt: form.prompt
        })
    }
    console.log(session)
    return (
        <>
            <Head>
                <title>Create T3 App</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="flex min-h-screen flex-col items-center justify-center">
                {!isLoggedIn 
                    ? <Button onClick={()=>signIn().catch(console.error)}>Login</Button> 
                    : <Button onClick={()=>signOut().catch(console.error)}>Logout</Button>
                }
                <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
                    <FormGroup>
                        <label>Prompt</label>
                        <Input value={form.prompt} onChange={updateForm('prompt')}></Input>
                    </FormGroup>
                    <Button>Submit</Button>
                </form>
            </main>
        </>
    );
};

export default GeneratePage;

