<script>
  export let title;
  export let fontSize = '1em';
</script>

<button on:click styling="font-size: {fontSize}">{title}</button>

<style>
  button {
    border: 1px solid lightgrey;
    padding: .4em .5em .3em .5em;
    border-radius: 4px;
    background: white;
    font-size: 1em;
  }

  button:focus {
    outline-color: lightsteelblue;
  }

  button:active {
    background: lightsteelblue;
  }
</style>
