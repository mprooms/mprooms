<script>
  import { createEventDispatcher } from 'svelte/internal';
  import Button from './Button';

  const dispatch = createEventDispatcher();

  function clickHandler(event) {
    dispatch('editName', true);
  }
</script>

<footer>
  <div>
    <h4>Room Availability:</h4>
    <div class="colors">
      <p class="color-splash available">free</p>
      <p class="color-splash taken">taken</p>
      <p class="color-splash full">full</p>
    </div>
  </div>
  <div>
    <Button on:click={clickHandler} title="Edit Name" />
  </div>
</footer>

<style>
  @media (max-width: 1024px) {
    footer h4 {
      display: none;
    }

    footer > div {
      margin-left: 1em;
    }

    footer > div:last-child {
      margin-right: 1em;
    }
  }

  @media (max-width: 512px) {
    footer {
      font-size: .8em;
    }

    .colors > p {
      min-width: 2em;
    }
  }

  h4 {
    padding: 0;
    margin-right: 1em;
  }

  footer {
    align-items: center;
    background: white;
    border-top: var(--table-view-border);
    bottom: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: var(--content-max-width);
    min-height: var(--table-view-margin);
    position: fixed;
    width: var(--app-width);
  }

  footer > div {
    display: flex;
    align-items: center;
  }

  /* button {
    border: 1px solid lightgrey;
    padding: .4em .5em .3em .6em;
    border-radius: 4px;
    background: white;
    font-size: 1em;
  }

  button:focus {
    outline-color: green;
  } */

  .colors {
    align-items: stretch;
    display: flex;
    flex-direction: row;
    margin: 0;
    padding: 0;
    text-align: center;
  }

  .colors > p {
    padding: 0 .5em;
    min-width: 3em;
    margin: 0 0 0 1em;
    position: relative;
    text-align: left;
    white-space: nowrap;
  }

  .color-splash::before {
    content: "";
    display: block;
    height: 1em;
    left: -1em;
    position: absolute;
    top: .2em;
    width: 1em;
  }

  .available::before {
    background-color: var(--color-available);
  }

  .taken::before {
    background-color: var(--color-reserved);
  }

  .full::before {
    background-color: var(--color-full);
  }
</style>
