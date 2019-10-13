import React from 'react';
import './TodoPalette.scss';

const Palette = ({ setColor, colors, onClick }) => {
  return (
    <div className="TodoPalette">
      {colors.map(color => (
        <div
          key={color}
          className={`color ${setColor === color ? 'checked' : ''}`}
          onClick={() => onClick(color)}
          style={{ background: color }}
        ></div>
      ))}
    </div>
  );
};

export default Palette;
