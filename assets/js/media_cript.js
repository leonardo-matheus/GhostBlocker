

$(function() {

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
  
    const copycanvas = document.getElementById("copy_canvas");
    const ctxx = copycanvas.getContext("2d");
    
    let img = new Image();
    let fileName = "";
    
    const downloadBtn = document.getElementById("savebtn");
    const uploadFile = document.getElementById("upload-file");
    
  
  
    var $reset = $('#resetbtn');
    var $brightness = $('#brightnessbtn');
    var $noise = $('#noisebtn');
    var $sepia = $('#sepiabtn');
    var $contrast = $('#contrastbtn');
    var $color = $('#colorbtn');
  
    var $vintage = $('#vintagebtn');
    var $lomo = $('#lomobtn');
    var $emboss = $('#embossbtn');
    var $tiltshift = $('#tiltshiftbtn');
    var $radialblur = $('#radialblurbtn');
    var $edgeenhance = $('#edgeenhancebtn');
  
    var $posterize = $('#posterizebtn');
    var $clarity = $('#claritybtn');
    var $orangepeel = $('#orangepeelbtn');
    var $sincity = $('#sincitybtn');
    var $sunrise = $('#sunrisebtn');
    var $crossprocess = $('#crossprocessbtn');
  
    var $hazydays = $('#hazydaysbtn');
    var $love = $('#lovebtn');
    var $grungy = $('#grungybtn');
    var $jarques = $('#jarquesbtn');
    var $pinhole = $('#pinholebtn');
    var $oldboot = $('#oldbootbtn');
    var $glowingsun = $('#glowingsunbtn');
  
    var $hdr = $('#hdrbtn');
    var $oldpaper = $('#oldpaperbtn');
    var $pleasant = $('#pleasantbtn');
  
  
  
  
    const uploadArea = $(".upload-area"),
      ctaUploadButton = $(".cta-upload-button"),
      previewUploadArea = $(".preview-upload-area"),
      resultado = $(".download-result-area"),
      previewUploadAreaFileName = $(".preview-upload-area #filename"),
      fileInput = $("#upload-file"),
      resetUploadButton = $(".reset-upload"),
      ctaResetUploadButton = $(".cta-reset-upload-button"),
      submitFilesButton = document.getElementById("processar"),
      noiseLevelInput = $("#noise"),
      submitfiles = $("#processar"),
      noiseLevelView = $("#noiseLevelView"),
      loadingElement = $("#loading");
  
  
    $(uploadArea).on("dragenter", function(a) {
      a.stopPropagation(), a.preventDefault()
  }), $(uploadArea).bind("dragover", function(a) {
      a.stopPropagation(), a.preventDefault(), $(this).addClass("upload-area-focus")
  }), $(uploadArea).bind("dragleave", function() {
      $(this).removeClass("upload-area-focus")
  }), $(uploadArea).bind("click", function() {
      $(fileInput).click()
  }), $(ctaUploadButton).bind("click", function() {
      $(fileInput).click()
  }), $(resetUploadButton).bind("click", function() {
      location.reload()
  }), $(ctaResetUploadButton).bind("click", function() {
      location.reload()
  }),$(noiseLevelInput).bind("input", function(a) {
    noiseLevelView.text(this.value)
  });
  try {
    document.querySelector(".upload-area").addEventListener("drop", function(a) {
        a.stopPropagation(), a.preventDefault();
        let b = a.dataTransfer.files[0];
        var element = document.getElementById('upload-file');
        var event = new Event('change');
        fileInput[0].files = a.dataTransfer.files;
        element.dispatchEvent(event);
    })
  } catch (a) {}
  
  
  
  
    /* Assim que o valor do controle deslizante mudar, chame applyFilters */
    $('input[type=range]').change(applyFilters);
  
    function applyFilters() {
      var noise = parseInt($('#noise').val());
      var cntrst = parseInt($('#contrast').val());
      var vibr = parseInt($('#vibrance').val());
      var sep = parseInt($('#sepia').val());
  
      Caman('#canvas', img, function() {
        this.revert(false);
        this.noise(noise).render();
      });
  
      Caman('#copy_canvas', img, function() {
        this.revert(false);
        this.noise(noise).render();
      });
  
    }
  
    uploadFile.onchange = function(e) {
      var ext = this.value.match(/\.([^\.]+)$/)[1];
      switch (ext) {
        case 'jpg':
        case 'bmp':
        case 'png':
        case 'tif':
          break;
        default:
          alert('Formato não permito.');
          this.value = '';
      }
    };
  
  
    // Subir arquivo
  uploadFile.addEventListener("change", () => {
    // Obter arquivo
    const file = document.getElementById("upload-file").files[0];
  
    // API de inicialização do leitor de arquivos
    const reader = new FileReader();
  
    // Verifique se há arquivo
    if (file) {
      // Definir nome do arquivo
      fileName = file.name;
      // Ler dados como URL
      reader.readAsDataURL(file);
    }
  
    // Adicionar imagem ao canvas
    reader.addEventListener(
      "load",
      () => {
        // Cria imagem
        img = new Image();
        // Definir origem da imagem
        img.src = reader.result;
        // No carregamento da imagem, adicione à tela
        img.onload = function() {
  
          var height = img.height;
          var width = img.width;
          if (height > 2000 || width > 2000) {
            alert("A imagem não pode ser maior que 2.000 x 2.000.");
            return false;
          } 
  
          var filename = uploadFile.files[0].name;
          previewUploadAreaFileName.text(filename);
          
  
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);
          canvas.removeAttribute("data-caman-id");
  
          copycanvas.width = img.width;
          copycanvas.height = img.height;
          ctxx.drawImage(img, 0, 0, img.width, img.height);
          copycanvas.removeAttribute("data-caman-id");
  
          uploadArea.hide();
          previewUploadArea.show();
          return true;
        };
      },
      false
    );
  });
  
  
  submitFilesButton.addEventListener("click", () => {
    submitfiles.hide();
    loadingElement.show();
    setTimeout(function() {
      loadingElement.hide();
      previewUploadArea.hide();
      resultado.show();
  }, 3000);
    
  
  
  });
  
  // Baixar evento
  downloadBtn.addEventListener("click", () => {
    // Get ext
    const fileExtension = fileName.slice(-4);
  
    // Iniciar novo nome de arquivo
    let newFilename;
  
    // Verifique o tipo de imagem
    if (fileExtension === ".jpg" || fileExtension === ".png") {
      // novo nome de arquivo
      newFilename = makeid(13) + ".jpg";
    }
  
    // Chamar download
    download(canvas, newFilename);
  });
  
  // Evento Download
  function download(canvas, filename) {
    // Iniciar evento
    let e;
    // Criar link
    const link = document.createElement("a");
  
    // Definir adereços
    link.download = filename;
    link.href = canvas.toDataURL("image/jpeg", 0.8);
  
    // Novo evento de mouse
    e = new MouseEvent("click");
    // Despachar evento
    link.dispatchEvent(e);
    
  }
  
  
  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  
  
  
  
    /* Criando filtros personalizados */
    Caman.Filter.register("oldpaper", function() {
      this.pinhole();
      this.noise(10);
      this.orangePeel();
      this.render();
    });
  
    Caman.Filter.register("pleasant", function() {
      this.colorize(60, 105, 218, 10);
      this.contrast(10);
      this.sunrise();
      this.hazyDays();
      this.render();
    });
  
    $reset.on('click', function(e) {
      $('input[type=range]').val(0);
      Caman('#canvas', img, function() {
        this.revert(false);
        this.render();
      });
    });
  
    /* Em filtros integrados */
    $brightness.on('click', function(e) {
      Caman('#canvas', function() {
        this.brightness(30).render();
      });
    });
  
    $noise.on('click', function(e) {
      Caman('#canvas', img, function() {
        this.noise(10).render();
      });
    });
  
    $contrast.on('click', function(e) {
      Caman('#canvas', img, function() {
        this.contrast(10).render();
      });
    });
  
    $sepia.on('click', function(e) {
      Caman('#canvas', img, function() {
        this.sepia(20).render();
      });
    });
  
    $color.on('click', function(e) {
      Caman('#canvas', img, function() {
        this.colorize(60, 105, 218, 10).render();
      });
    });
  
    $vintage.on('click', function(e) {
      Caman('#canvas', img, function() {
        this.vintage().render();
      });
    });
  
    $lomo.on('click', function(e) {
      Caman('#canvas', img, function() {
        this.lomo().render();
      });
    });
  
    $emboss.on('click', function(e) {
      Caman('#canvas', img, function() {
        this.emboss().render();
      });
    });
  
    $tiltshift.on('click', function(e) {
      Caman('#canvas', img, function() {
        this.tiltShift({
          angle: 90,
          focusWidth: 600
        }).render();
      });
    });
  
    $radialblur.on('click', function(e) {
      Caman('#canvas', img, function() {
        this.radialBlur().render();
      });
    });
  
    $edgeenhance.on('click', function(e) {
      Caman('#canvas', img, function() {
        this.edgeEnhance().render();
      });
    });
  
    $posterize.on('click', function(e) {
      Caman('#canvas', img, function() {
        this.posterize(8, 8).render();
      });
    });
  
    $clarity.on('click', function(e) {
      Caman('#canvas', img, function() {
        this.clarity().render();
      });
    });
  
    $orangepeel.on('click', function(e) {
      Caman('#canvas', img, function() {
        this.orangePeel().render();
      });
    });
  
    $sincity.on('click', function(e) {
      Caman('#canvas', img, function() {
        this.sinCity().render();
      });
    });
  
    $sunrise.on('click', function(e) {
      Caman('#canvas', img, function() {
        this.sunrise().render();
      });
    });
  
    $crossprocess.on('click', function(e) {
      Caman('#canvas', img, function() {
        this.crossProcess().render();
      });
    });
  
    $love.on('click', function(e) {
      Caman('#canvas', img, function() {
        this.love().render();
      });
    });
  
    $grungy.on('click', function(e) {
      Caman('#canvas', img, function() {
        this.grungy().render();
      });
    });
  
    $jarques.on('click', function(e) {
      Caman('#canvas', img, function() {
        this.jarques().render();
      });
    });
  
    $pinhole.on('click', function(e) {
      Caman('#canvas', img, function() {
        this.pinhole().render();
      });
    });
  
    $oldboot.on('click', function(e) {
      Caman('#canvas', img, function() {
        this.oldBoot().render();
      });
    });
  
    $glowingsun.on('click', function(e) {
      Caman('#canvas', img, function() {
        this.glowingSun().render();
      });
    });
  
    $hazydays.on('click', function(e) {
      Caman('#canvas', img, function() {
        this.hazyDays().render();
      });
    });
  
    /* Chamando vários filtros dentro da mesma função */
    $hdr.on('click', function(e) {
      Caman('#canvas', img, function() {
        this.contrast(10);
        this.contrast(10);
        this.jarques();
        this.render();
      });
    });
  
    /* Filtros personalizados que criamos */
    $oldpaper.on('click', function(e) {
      Caman('#canvas', img, function() {
        this.oldpaper();
        this.render();
      });
    });
  
    $pleasant.on('click', function(e) {
      Caman('#canvas', img, function() {
        this.pleasant();
        this.render();
      });
    });
  
  
  });