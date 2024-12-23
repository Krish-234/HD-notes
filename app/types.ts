interface Note {
    id: string;
    title: string;
    content: string;
    editedAt: Date;
    createdAt: Date;
    userId: string;
}

interface session {
    user: {
        id:string;
        name: string;
        email: string;
    };
    session: boolean;
}


export type { Note, session };