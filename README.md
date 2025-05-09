# `tosu-ingame-overlay`
High performance [tosu](https://github.com/tosuapp/tosu) fullscreen ingame overlay

Supports OpenGL(stable, lazer), dx9(stable compat), dx11(lazer)

## Performance
This projects uses shared gpu surface for rendering overlay, so no cpu work is involved.
It have same or less performance overhead than adding a OBS browser source.
Which is very small and also have no noticeable input latency.

## Development
```
pnpm dev
```

## Build
```
pnpm dist
```

## License
This project is licensed under GPL-3.0
