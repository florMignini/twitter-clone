"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import type { SupabaseClient, User } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/lib/supabase.types";
import AuthModal from './ui/modal/AuthModal'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link } from '@nextui-org/react'
import { MailIcon } from './ui/modal'
import { Avatar, AvatarIcon } from "@nextui-org/react";
import { Toaster, toast } from "sonner";


type SupabaseContext = {
    supabase: SupabaseClient<Database>;
};

export const Context = createContext<SupabaseContext | undefined>(undefined);

export default function SupabaseProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [supabase] = useState(() => createPagesBrowserClient());
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    //modal stateHandler
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(() => {
            router.refresh();
        });

        supabase.auth.getSession().then((res) => {
            if (!res.data.session) {
                onOpen()
                return;
            }
            setUser(res.data.session.user);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [router, supabase]);

    const handleSignUp = async() => {

        // checking if the user exist in DB
        const { data, error } = await supabase.from('profiles').select().eq('username', username.trim())
        if (data && data?.length > 0) {
            toast.error(`username already exist, please take another one `)
        }

        //  otherwise storage on DB
        await supabase.auth.signInWithOtp({
            email: email.trim(),
            options: {
                data: {
                    username
                }
            }
        })
    }

    return (
        <Context.Provider value={{ supabase }}>
            <>
                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    placement="top-center"
                    backdrop='blur'
                    className='bg-black w-full h-[60%]'
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col items-center justify-center text-3xl mt-2  gap-1">Log in on Twitter</ModalHeader>
                                <ModalBody className='backdrop-blur-md flex justify-center items-center'>

                                    <form className='flex flex-col w-full h-full items-center justify-evenly'
                                    >
                                        <Input
                                            autoFocus
                                            endContent={
                                                <MailIcon className="text-3xl w-9 h-10 text-black/80 rounded-full p-1 mb-3 bg-gradient-to-br from-[#FFB457] to-[#FF705B] pointer-events-none flex-shrink-0" />
                                            }
                                            label="Email"
                                            placeholder="Enter your email"
                                            variant="bordered"
                                            className='text-blue-500'
                                            onChange={({ target }) => setEmail(target.value)}
                                        />
                                        <Input
                                            label="Username"
                                            endContent={
                                                <Avatar
                                                    icon={<AvatarIcon />}
                                                    classNames={{
                                                        base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B] flex items-center justify-center mb-3 ",
                                                        icon: "text-black/80",
                                                    }}
                                                />
                                            }
                                            placeholder="Enter your username"
                                            type="text"
                                            variant="bordered"
                                            className='text-blue-500'
                                            onChange={({ target }) => setUsername(target.value)}
                                        />
                                    </form>

                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="flat" /* onClick={handleSignOut} */ onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" onClick={handleSignUp} onPress={onClose}>
                                        Sign in
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
                {children}
            </>
        </Context.Provider>
    );
}

export const useSupabase = () => {
    const context = useContext(Context);

    if (context === undefined) {
        throw new Error("useSupabase must be used inside SupabaseProvider");
    }

    return context;
};