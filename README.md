ng add command is used to add libraries to our project.
only libraries that support this command can be added with it.

localstorage is browser side feature and not available on server, and on reload when server tries to load the page and runs this we get an error.

EasyWay to fix: afterNextRender

function passed in afterNextRender is only executed after the angular's next render cycle.
Even though if put things in a service but a service is being used by some component. 
Therefore components are rendered by application.
afterNextRender does not care about which component is being rendered next.
It simply allows us to register a function to execute some code that will be executed the next time after all components are rendered.
The next time angular goes through all our components and rendering them, or rendering the component tree.
Therefore this function will only be executed in client side.
Angular renders the components and prepares some HTML code on the server but they're only rendered to the DOM on the client side, because DOM exists only on client side.
And it is after that client-side render cycle that this function that is passed to afterNextRender is executed.
so afterNextRender is a safe place for executing any code that must only run in the browser.