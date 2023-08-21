import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-box-breathing',
  templateUrl: './box-breathing.component.html',
  styleUrls: ['./box-breathing.component.css'],
})
export class BoxBreathingComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
   
    const canvas = document.getElementById('main-canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    function roundedRect(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      width: number,
      height: number,
      radius: number
    ) {
      ctx.beginPath();
      ctx.moveTo(x, y + radius);
      ctx.arcTo(x, y + height, x + radius, y + height, radius);
      ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
      ctx.arcTo(x + width, y, x + width - radius, y, radius);
      ctx.arcTo(x, y, x, y + radius, radius);
      ctx.stroke();
    }

    const phase_time = 4;
    const dpr = Math.ceil(window.devicePixelRatio);
    canvas.width = 200 * dpr;
    canvas.height = 200 * dpr;
    ctx.scale(dpr, dpr);

    ctx.font = '10px Roboto, sans-serif';
    ctx.lineWidth = 5;

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document
        .querySelector('meta[name="theme-color"]')!
        .setAttribute('content', 'black');
      (document.querySelector('link[rel="manifest"]') as HTMLLinkElement).href =
        'manifest-dark.json';
      ctx.strokeStyle = 'rgba(35, 65, 77, 0.2)';
    } else {
      ctx.strokeStyle = '#dbf5ff';
    }
    const stages = ['Udahni', 'Zadrži dah', 'Izdahni', 'Zadrži dah'];
    const textWidths = stages.map((text) => ctx.measureText(text).width);

    function text(section: number, opacity: number) {
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fillText(stages[section], 100 - textWidths[section] / 2, 105);
    }

    function line(section: number, location: number, length: number) {
      // ctx.fillStyle = 'rgba(35, 65, 77, 0.5)';
      ctx.fillStyle = 'white';
      ctx.beginPath();

      switch (section) {
        case 0:
          ctx.rect(location, 0, length, 10);
          break;
        case 1:
          ctx.rect(190, location, 10, length);
          break;
        case 2:
          ctx.rect(200 - location, 190, -length, 10);
          break;
        case 3:
          ctx.rect(0, 200 - location, 10, -length);
          break;
      }

      ctx.fill();
    }
    const ten = 10000;
    function tick(start: number) {
      const t = Date.now() - start - ten;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      roundedRect(ctx, 5, 5, 190, 190, 15);

      const section = Math.floor((t / (1000 * phase_time)) % 4);
      const nextSection = (section + 1) % 4;
      const completion = (t % (1000 * phase_time)) / (1000 * phase_time);

      line(section, completion * 190, 50);

      if (completion > 0.8) {
        line(nextSection, 10, completion * 200 - 160);
      }

      if (completion > 0.85) {
        const opacity = (completion - 0.85) / 0.15;
        text(nextSection, opacity);
        text(section, 1 - opacity);
      } else {
        text(section, 1);
      }

      if (canvas.ariaLabel !== stages[section]) {
        canvas.ariaLabel = stages[section];
      }

      window.requestAnimationFrame(() => tick(start));
    }

    tick(Date.now());

    /*******************Second_canvas*****************/
    const canvas2 = document.getElementById(
      'second-canvas'
    ) as HTMLCanvasElement;
    const ctx2 = canvas2.getContext('2d') as CanvasRenderingContext2D;

    const texts = [
      {
        content:
          '"Box breathing" je tehnika disanja koja:<br> <br>-smanjuje stres,<br> <br>-poboljšava raspoloženje, <br><br> -omogućava bolju kontrolu nad emocijama',
        duration: 10000,
        fontSize: '25px',
      },
      {
        content:
          'PRAVILA: <br> <br> <br> Čitajte naredbe u sredini kvadrata <br> <br>1) Udahni- udišite zrak 4 sekunde <br> <br>2) Zadrži dah- zadrži dah 4 sekunde <br> <br>3) Izdahni- Izdišite zrak 4 sekunde <br> <br>4) Zadrži dah- zadrži dah 4 sekunde ',
        duration: 10000,
        fontSize: '25px',
      },
      {
        content: 'Opustite se :)',
        duration: 3000,
        fontSize: '30px',
      },
      { content: '3', duration: 1000, fontSize: '150px' },
      { content: '2', duration: 1000, fontSize: '150px' },
      { content: '1', duration: 1000, fontSize: '150px' },
    ];

    let currentIndex = 0;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const startX = screenWidth / 4.5; // Početna pozicija x-osi teksta
    function drawText() {
      const dpr = Math.ceil(window.devicePixelRatio); // Računanje razlučivosti uređaja

      // Postavljanje širine i visine canvasa s skaliranjem
      canvas2.width = 700 * dpr;
      canvas2.height = 700 * dpr;
      ctx2.scale(dpr, dpr);

      ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
      // ctx2.fillStyle = '#FFA500';
      ctx2.fillStyle = '#c0c0c0';
      ctx2.font = texts[currentIndex].fontSize + ' Roboto';
      const lines = texts[currentIndex].content.split('<br>'); // Podjela teksta na linije na temelju <br> tagova

      const lineHeight = 30; // Visina svake linije teksta
      const textWidth = ctx2.measureText(lines[0]).width; // Širina prvog retka teksta
      const textHeight = lines.length * lineHeight; // Visina teksta

      const startY = (screenHeight - textHeight) / 2; // Početna pozicija y-osi teksta

      ctx2.textAlign = 'center'; // Postavljanje poravnanja teksta na centar
      ctx2.textBaseline = 'middle'; // Postavljanje bazne linije teksta na sredinu

      lines.forEach((line, index) => {
        const y = startY + index * lineHeight;
        ctx2.fillText(line, startX, y);
      });

      setTimeout(() => {
        currentIndex = (currentIndex + 1) % texts.length;
        drawText();
      }, texts[currentIndex].duration);
    }

    drawText();

//////////////**component substitution */

    const duration1 = 26; // Trajanje second kanvasa u sekundama
    const duration2 = 96; // Trajanje main kanvasa u sekundama
    const totalDuration = duration1 + duration2; // Ukupno trajanje animacije

    const startTime = Date.now();

    function animate() {
      const currentTime = Date.now();
      const elapsedSeconds = (currentTime - startTime) / 1000;

      if (elapsedSeconds < duration1) {
        canvas.style.display = "none";
        canvas2.style.display = "block";
      } else if (elapsedSeconds < totalDuration) {
        canvas.style.display = "block";
        canvas2.style.display = "none";
      } else {
        canvas.style.display = "none";
        canvas2.style.display = "none";
        return;
      }
      requestAnimationFrame(animate);
    }
    animate();
  }

    
}
