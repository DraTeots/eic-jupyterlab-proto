import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import {
  ICommandPalette
} from '@jupyterlab/apputils';

import {
  Widget
} from '@phosphor/widgets';


import '../style/index.css';


/**
 * Initialization data for the eic-jupyterlab-demo extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'eic-jupyterlab-demo',
  requires: [ICommandPalette],
  autoStart: true,
  activate: (app: JupyterLab, palette: ICommandPalette) => {
    console.log('JupyterLab extension eic-jupyterlab-demo is activated!');

    // Create a single widget
    let widget: Widget = new Widget();
    widget.id = 'xkcd-jupyterlab';
    widget.title.label = 'xkcd.com';
    widget.title.closable = true;

    // Add an image element to the panel
    let img = document.createElement('img');
    widget.node.appendChild(img);

    // Fetch info about a random comic
    fetch('https:////egszlpbmle.execute-api.us-east-1.amazonaws.com/prod').then(response => {
      return response.json();
    }).then(data => {
      img.src = data.img;
      img.alt = data.title;
      img.title = data.alt;
    });

    // Add an application command
    const command: string = 'xkcd:open';
    app.commands.addCommand(command, {
      label: 'Random xkcd comic',
      execute: () => {
        if (!widget.isAttached) {
          // Attach the widget to the main work area if it's not there
          app.shell.addToMainArea(widget);
        }
        // Activate the widget
        app.shell.activateById(widget.id);
      }
    });

    console.log('Command is:', command);

    // Add the command to the palette.
    palette.addItem({command, category: 'Tutorial'});

    console.log('ICommandPalette:', palette);
  }
};

export default extension;
