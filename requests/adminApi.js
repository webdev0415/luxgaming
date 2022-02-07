const token = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJpZFVzZXIiOiIxMDIiLCJsc3RJZFJvbGVUeXBlIjoiOTEiLCJleHAiOjE2MzgyOTkxOTMsImlzcyI6Im1tZE1hbmFnZXJzIiwiYXVkIjoibW1kUGVvcGxlIn0.jSX6UTknIZ87buzthIXvygQb4cuwq2FeosQplDg02kg'


export const getToken = async () => {
const token = await fetch(`${process.env.BASE_API_URL}/User/GetToken`,
{

    method: "GET",
    headers: {
      "accept": "*/*",
        "userName" : "admin",
        "password" : "luxury!gaming2021",
    },
}
)
token.text().then(text => {
  return text
})
}

