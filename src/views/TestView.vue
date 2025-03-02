<script setup lang="ts">
import { onMounted, ref } from 'vue';

interface Position {
    x: number;
    y: number;
}

const canvas = ref<HTMLCanvasElement>();

function fillRect(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    color: CanvasFillStrokeStyles['fillStyle'],
): void {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}

const keys: Record<string, { pressed: boolean }> = {
    w: { pressed: false },
    a: { pressed: false },
    s: { pressed: false },
    d: { pressed: false },
    q: { pressed: false },
    e: { pressed: false },
};

window.addEventListener('keydown', ({ key }) => {
    keys[key] ??= { pressed: true };
    keys[key].pressed = true;
});

window.addEventListener('keyup', ({ key }) => {
    keys[key] ??= { pressed: false };
    keys[key].pressed = false;
});

class Player {
    private context: CanvasRenderingContext2D;
    private readonly width: number = 50;
    private readonly height: number = 50;
    private velocity: number = 5;
    private position: Position = { x: 0, y: 0 };

    public constructor(context: CanvasRenderingContext2D) {
        this.context = context;
    }

    private fill(
        context: CanvasRenderingContext2D,
        x: number,
        y: number,
        w: number,
        h: number,
        color: CanvasFillStrokeStyles['fillStyle'],
    ): void {
        fillRect(
            context,
            this.position.x + x,
            this.position.y + y,
            w,
            h,
            color,
        );
    }
    private draw(context: CanvasRenderingContext2D): void {
        const halfWidth = this.width / 2,
            halfHeight = this.height / 2,
            qWidth = halfWidth / 2,
            qHeight = halfHeight / 2;

        // Body
        this.fill(context, 0, 0, halfWidth, halfHeight, 'red');
        this.fill(context, halfWidth, 0, halfWidth, halfHeight, 'green');
        this.fill(context, 0, halfHeight, halfWidth, halfHeight, 'blue');
        this.fill(
            context,
            halfWidth,
            halfHeight,
            halfWidth,
            halfHeight,
            'yellow',
        );

        // Eyes
        this.fill(
            context,
            qWidth / 2,
            qHeight / 2,
            halfWidth - qWidth,
            halfHeight - qHeight,
            'black',
        );
        this.fill(
            context,
            halfWidth + qWidth / 2,
            qHeight / 2,
            halfWidth - qWidth,
            halfHeight - qHeight,
            'black',
        );

        // Mouth
        this.fill(
            context,
            qWidth / 2,
            halfHeight + qHeight / 2,
            halfWidth + qWidth,
            halfHeight - qHeight,
            'black',
        );
    }

    public update(): void {
        let v = this.velocity;

        // Diagonal speed adjust
        const isDiagonal = [
            keys.w.pressed && keys.a.pressed,
            keys.s.pressed && keys.d.pressed,
            keys.w.pressed && keys.d.pressed,
            keys.s.pressed && keys.a.pressed,
        ].some((x) => x);

        if (isDiagonal) {
            v /= 1.4142135623730951; // 2 ** 0.5
        }

        this.position.x += v * (+keys.d.pressed - +keys.a.pressed);
        this.position.y += v * (+keys.s.pressed - +keys.w.pressed);

        // Out of bounds
        this.position.x = Math.max(
            0,
            Math.min(this.context.canvas.width - this.width, this.position.x),
        );
        this.position.y = Math.max(
            0,
            Math.min(this.context.canvas.height - this.height, this.position.y),
        );

        this.velocity += +keys.e.pressed - +keys.q.pressed;

        this.velocity = Math.max(1, this.velocity);
        this.draw(this.context);
    }

    public getContext(): CanvasRenderingContext2D {
        return this.context;
    }
}

function getAnimate(player: Player): () => void {
    const animate = () => {
        const context = player.getContext();
        window.requestAnimationFrame(animate);
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        player.update();
    };

    return animate;
}

onMounted(() => {
    const context = canvas.value?.getContext('2d');
    if (!context) {
        return;
    }

    const player = new Player(context);
    const animate = getAnimate(player);
    animate();
});
</script>

<template>
    <canvas ref="canvas" width="800" height="800"></canvas>
</template>
