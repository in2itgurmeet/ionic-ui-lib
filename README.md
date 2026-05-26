# Ionic UI Lib

Professional reusable Ionic + Angular component library workspace.

This repository builds a publishable Angular library that can be consumed by:

- Ionic Angular applications
- Standard Angular applications that install and configure Ionic Angular

## Package Metadata

The npm package metadata is defined in `projects/ionic-ui-lib/package.json` and includes:

- Package name
- Version
- Author
- Description
- GitHub repository
- Homepage
- License
- Keywords
- Documentation link
- Creator information

## Install Dependencies

```bash
npm install
```

## Build Library

```bash
npm run build:prod
```

The publishable package is generated at `dist/ionic-ui-lib`.

## Included Components

- `iui-action-button`
- `iui-surface-card`
- `iui-input`
- `iui-single-select`
- `iui-multi-select`
- `iui-modal`
- `IuiModalService` for NgbModal-style dynamic modals

## Local Package Test

```bash
npm run pack
```

This creates a `.tgz` package inside `dist/ionic-ui-lib` that can be installed into another Angular or Ionic Angular application.

## Publish To npm

```bash
npm run publish:lib
```

Before publishing, update the repository URLs if your GitHub username or repository name differs from the defaults in `projects/ionic-ui-lib/package.json`.
