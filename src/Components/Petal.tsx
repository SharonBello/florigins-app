type PetalProps = {
  rotation: number;
  gradientId: string;
  shapePath: string;
};

export const Petal = ({ rotation, gradientId, shapePath }: PetalProps) => (
    <g transform={`rotate(${rotation} 50 50)`} style={{ transition: 'transform 0.5s ease-in-out', transformOrigin: '50% 50%' }}>
      <path
        d={shapePath}
        fill={`url(#${gradientId})`}
        transform="translate(0, -40) scale(0.9)" // Adjust position and scale relative to center
      />
    </g>
);