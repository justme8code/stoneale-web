import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({
  component: RouteComponent,
    loader:async ({params}) =>{
      throw new Error("Not Found")
      await new Promise(resolve => setTimeout(resolve, 5000));
      return {
          postId:params.postId
      }
    },
    pendingComponent: (props) => <div>Loading...</div>,
    errorComponent: (props) => <div>Something went wrong.</div>
})

function RouteComponent() {
    const {postId} = Route.useLoaderData();
  return <div>Hello {postId}</div>
}
