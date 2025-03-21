import React, { useRef, useEffect } from "react";

const StaffRenderer = ({ currentNote }) => {
  const canvasRef = useRef(null);

  // Function to draw the staff and note
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Set line style
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000";

    // Draw grand staff (treble and bass clefs combined)
    const lineSpacing = 10;
    const middleC = height / 2;
    const trebleStaffTop = middleC - lineSpacing * 5;
    const bassStaffTop = middleC + lineSpacing;

    // Draw treble clef staff lines
    for (let i = 0; i < 5; i++) {
      const y = trebleStaffTop + i * lineSpacing;
      ctx.beginPath();
      ctx.moveTo(30, y);
      ctx.lineTo(width - 30, y);
      ctx.stroke();
    }

    // Draw bass clef staff lines
    for (let i = 0; i < 5; i++) {
      const y = bassStaffTop + i * lineSpacing;
      ctx.beginPath();
      ctx.moveTo(30, y);
      ctx.lineTo(width - 30, y);
      ctx.stroke();
    }

    // Draw ledger line for middle C
    ctx.beginPath();
    ctx.moveTo(width / 2 - 15, middleC);
    ctx.lineTo(width / 2 + 15, middleC);
    ctx.stroke();

    // Draw treble clef symbol
    ctx.font = "40px serif";
    ctx.fillText("𝄞", 10, trebleStaffTop + 4 * lineSpacing);

    // Draw bass clef symbol
    ctx.font = "40px serif";
    ctx.fillText("𝄢", 10, bassStaffTop + 3 * lineSpacing);

    // Draw the current note if it exists
    if (currentNote) {
      // Calculate note position based on note name and octave
      const noteIndex = ["C", "D", "E", "F", "G", "A", "B"].indexOf(
        currentNote.note
      );
      let position;

      // Position mapping for different octaves
      if (currentNote.octave === 3) {
        // Notes in the bass clef (C3-B3)
        position =
          bassStaffTop + (6 - noteIndex) * lineSpacing - lineSpacing / 2;
      } else if (currentNote.octave === 4) {
        // Notes in the treble clef (C4-B4)
        position =
          trebleStaffTop + (13 - noteIndex) * lineSpacing - lineSpacing / 2;
      }

      // Draw note oval
      ctx.beginPath();
      ctx.ellipse(
        width / 2,
        position,
        lineSpacing,
        lineSpacing * 0.8,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Draw ledger lines if needed
      if (currentNote.octave === 3 && noteIndex <= 1) {
        // Ledger lines for C3 and D3 (below bass staff)
        for (let i = 0; i <= 1 - noteIndex; i++) {
          const ledgerY = bassStaffTop + 5 * lineSpacing + i * lineSpacing;
          ctx.beginPath();
          ctx.moveTo(width / 2 - 15, ledgerY);
          ctx.lineTo(width / 2 + 15, ledgerY);
          ctx.stroke();
        }
      } else if (currentNote.octave === 4 && noteIndex >= 5) {
        // Ledger lines for A4 and B4 (above treble staff)
        for (let i = 0; i <= noteIndex - 5; i++) {
          const ledgerY = trebleStaffTop - i * lineSpacing;
          ctx.beginPath();
          ctx.moveTo(width / 2 - 15, ledgerY);
          ctx.lineTo(width / 2 + 15, ledgerY);
          ctx.stroke();
        }
      }
    }
  }, [currentNote]);

  return (
    <div className="flex justify-center mb-4">
      <canvas
        ref={canvasRef}
        width={300}
        height={200}
        className="border border-gray-300 rounded"
      />
    </div>
  );
};

export default StaffRenderer;
