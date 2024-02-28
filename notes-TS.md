```
export async function action({ request }: ActionFunctionArgs) {
 const formData = await request.formData()
 const submission = parse(formData, { schema: searchSchema })

 if (!submission.value) {
   return json(
     { status: 'error', submission, studios: undefined },
   )
 }

 const { searchVal } = submission.value

 const studios = await parentSearchStudios({ searchVal })
 console.log('studios response', studios)

 return json({ submission, studios })
}
```

both return paths from your action function include a studios property, but the critical difference lies in the explicit setting of studios to undefined in the error case. TypeScript's strict typing system sees undefined as a distinct type that doesn't match the expected array type for studios in the success case. Hence, when you attempt to access studios and perform array operations like .map(), TypeScript warns you because from its perspective, there's a code path where studios is undefined, not an array.

To clarify, TypeScript isn't just looking for the presence of a property but also its type across all branches of your code. When you set studios to undefined, TypeScript understands it as: "There's a scenario where studios is not an array (or not present in the type I expect), and I need to ensure the code accounts for that."

/////////////////////////////////////////////////////////////////////
