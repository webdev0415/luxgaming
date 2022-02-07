import { getSession } from 'next-auth/client'

export default async (req, res) => {
  const session = await getSession({ req })
  if (session && session.roles === 91) {
        res.send({ content: 'Welcome ' + session.roles + '(admin)'})
  } 
    else if(session) {
    res.send({ content: 'You are signed in ' + session.roles  })
  }

    else {
    res.send({ content: 'You must be sign in to view the protected content on this page.' })
  }
}