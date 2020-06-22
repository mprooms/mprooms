<script>
  import { createEventDispatcher } from 'svelte/internal';

  import Button from './Button';
  import userState from '../state/user';

  const messageCharacters = 'Only letters and numbers are allowed.';
  const messageEmpty = 'Name cannot be empty.';

  const dispatch = createEventDispatcher();

  $: warning = checkName($userState.name);

  function handleSubmit(event) {
    event.preventDefault();

    if (warning.length < 1) {
      dispatch('submitted', true);
    }
  }

  function checkName(name) {
    if (name.length < 1) {
      return messageEmpty;
    }

    if (!/^[a-zA-Z0-9]+$/.test(name)) {
      return messageCharacters;
    }

    return '';
  }
</script>

<div class="container">
  <form on:submit|preventDefault={handleSubmit}>
    <h4>Please enter your name</h4>

    <div>
      <input type="text" tabindex="0"
        placeholder="e.g. prhz"
        on:keyup={e => userState.setName(e.target.value)}
        value={$userState.name}
      />
      <Button on:click={handleSubmit} title="Ok" />
    </div>

    <p>{ warning }</p>
  </form>
</div>

<style>
  .container {
    align-items: center;
    background: rgba(0, 0, 0, .5);
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 500;
  }

  form {
    background: white;
    min-height: 9em;
    padding: 1em 3em 2em;
    position: relative;
    top: -3em;
  }

  form > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  form > p {
    color: red;
    font-size: .8em;
  }

  input {
    background: white;
    border: none;
    border-bottom: 1px solid lightslategrey;
    font-size: 1em;
    margin-right: 1em;
    outline: none;
    padding: .3em 0;
    transition: all .3s ease-out;
  }

  input[type="text" i]:focus, input:active {
    outline: none;
  }
</style>
