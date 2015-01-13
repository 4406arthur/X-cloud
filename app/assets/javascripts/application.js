// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require twitter/bootstrap
//= require turbolinks
//= require_tree .



$(document).ready(function() {
    // bind 'myForm' and provide a simple callback function 
    $('#yzu').on('submit', function(e) {
        console.log('hi');

        var $service_id_gdriver = $(this).find('#yzu2').attr("data-gid");
        var $service_id_dropbox = $(this).find('#yzu2').attr("data-did");
        var $folder_id_gdriver = $(this).find('#yzu2').attr("data-gfolder");
        var $folder_id_dropbox = $(this).find('#yzu2').attr("data-dfolder");

        console.log()

        e.preventDefault();
        //get file
        file = $(this).find('#file').first()[0].files[0];
        console.log(file);
        var fr = new FileReader();
        var buf;
        console.log(file.name);
        //load file each 8 bit
        fr.onload = function(e) {
            console.log(e);
            buf = new Uint8Array(e.target.result);

            async.parallel({
                // post google
                google: function(callback) {
                    var formData = new FormData();
                    formData.append('file', new Blob([buf.subarray(0, Math.ceil(buf.length / 2))]));
                    formData.append('metadata', '{"parent_id":"' + $folder_id_gdriver + '", "name":"' + file.name + '"}');
                    $.ajax({
                        url: "https://api.kloudless.com:443/v0/accounts/" + $service_id_gdriver + "/files/",
                        type: 'POST',
                        processData: false,
                        contentType: false,
                        data: formData,
                        headers: {
                            Authorization: 'ApiKey CbdAL_JeRmFRx0ZuxP1wLAzbVv5IeyrVXtdJ1cigadzDOAin'
                        }
                    }).then(function(res) {
                        callback(null, 1);
                    });
                },

                // post dropbox
                dropbox: function(callback) {
                    formData2 = new FormData();
                    formData2.append(
                        'file',
                        new Blob([
                            buf.subarray(Math.ceil(buf.length / 2), buf.length)
                        ])
                    );
                    formData2.append('metadata', '{"parent_id":"' + $folder_id_dropbox + '", "name":"' + file.name + '"}');
                    $.ajax({
                        url: "https://api.kloudless.com:443/v0/accounts/" + $service_id_dropbox + "/files/",
                        type: 'POST',
                        processData: false,
                        contentType: false,
                        data: formData2,
                        headers: {
                            Authorization: 'ApiKey CbdAL_JeRmFRx0ZuxP1wLAzbVv5IeyrVXtdJ1cigadzDOAin'
                        }
                    }).then(function(res) {
                        callback(null, 2);
                    });
                }
            }, function(err, results) {
                console.log(err);
                console.log(results);
            });
        };
        fr.readAsArrayBuffer(file);
    });

$('.arthur').on('click', function(e) {
	// download
	 console.log("download...");
    var $service_id_gdriver = $(this).attr("data-gid");
    var $service_id_dropbox = $(this).attr("data-did");
    var $file_id_gdriver = $(this).attr("data-gfileid");
    var $file_id_dropbox = $(this).attr("data-dfileid");
    var $filename = $(this).attr("data-filename");
   
    async.parallel({
            google: function(callback) {
                console.log("google dn");
                //google
                requestUrl = "https://api.kloudless.com:443/v0/accounts/" + $service_id_gdriver + "/files/" + $file_id_gdriver + "/contents";
                var xhr = new XMLHttpRequest();
                xhr.open("GET", requestUrl);
                xhr.responseType = "arraybuffer";
                xhr.setRequestHeader("Authorization", "ApiKey CbdAL_JeRmFRx0ZuxP1wLAzbVv5IeyrVXtdJ1cigadzDOAin");
                
                xhr.onload = function() {
                    //console.log(xhr);
                    if (this.status === 200) {
                        // console.log( xhr.responseType );
                        contentType = xhr.getResponseHeader("Content-Type");
                        ab1 = xhr.response;
                        //var objectUrl = URL.createObjectURL(blob);
                        //window.open(objectUrl);
                        console.log("google dn finish");
                        callback(null, 1);
                    }
                };
                xhr.send();
            },
            drop: function(callback) {
                console.log("dropbox dn");
                //dropbox
                dropUrl = "https://api.kloudless.com:443/v0/accounts/" + $service_id_dropbox + "/files/"+ $file_id_dropbox +"/contents";
                var xhr2 = new XMLHttpRequest();
                xhr2.open("GET", dropUrl);
                xhr2.responseType = "arraybuffer";
                xhr2.setRequestHeader("Authorization", "ApiKey CbdAL_JeRmFRx0ZuxP1wLAzbVv5IeyrVXtdJ1cigadzDOAin");

                xhr2.onload = function() {
                    //console.log(xhr2);
                    if (this.status === 200) {
                        // console.log( xhr2.responseType );
                        ab2 = xhr2.response;
                		console.log("dropbox dn finish");
                        callback(null, 2);
                    }
                };
                xhr2.send();
            }
        },
        function(err, results) {
            // debug
            console.log(err);
            console.log(results);
            // debug end
            var myBlobBuilder = new MyBlobBuilder();FOngWn5W_8EbPEbtQbU7EoAx2oF5HY8N8luEx3CffR4s=
            myBlobBuilder.append(ab1);
            myBlobBuilder.append(ab2);

            var blob = myBlobBuilder.getBlob(contentType);
            // var fileName = 'test';
            saveAs(blob, $filename);
        });
});

$('.jamie').on('click', function(e) {
    console.log("delete action");
    var $service_id_gdriver = $(this).attr("data-gid");
    var $service_id_dropbox = $(this).attr("data-did");
    var $file_id_gdriver = $(this).attr("data-gfileid");
    var $file_id_dropbox = $(this).attr("data-dfileid");
    
    async.parallel({
            google: function(callback) {
                //google
                console.log("google delete");
                requestUrl = "https://api.kloudless.com:443/v0/accounts/" + $service_id_gdriver + "/files/" + $file_id_gdriver;
                var xhr = new XMLHttpRequest();
                xhr.open("DELETE", requestUrl);
                xhr.setRequestHeader("Authorization", "ApiKey CbdAL_JeRmFRx0ZuxP1wLAzbVv5IeyrVXtdJ1cigadzDOAin");
                
                xhr.onload = function() {
                    if (this.status === 200) {
                        //console.log(xhr);
                        console.log("google delete finish");
                        callback(null, 1);
                    }
                };
                xhr.send();
            },
            drop: function(callback) {
                //dropbox
                console.log("dropbox delete");
                dropUrl = "https://api.kloudless.com:443/v0/accounts/" + $service_id_dropbox + "/files/"+ $file_id_dropbox;
                var xhr2 = new XMLHttpRequest();
                xhr2.open("DELETE", dropUrl);
                xhr2.setRequestHeader("Authorization", "ApiKey CbdAL_JeRmFRx0ZuxP1wLAzbVv5IeyrVXtdJ1cigadzDOAin");

                xhr2.onload = function() {
                    if (this.status === 200) {
                        //console.log(xhr2);
                        console.log("dropbox delete finish");
                        callback(null, 2);
                    }
                };
                xhr2.send();
            }
        },
        function(err, results) {
            // debug
            console.log(err);
            console.log(results);
        });
});
});
//lib
var MyBlobBuilder = function() {
  this.parts = [];
};

MyBlobBuilder.prototype.append = function(part) {
  this.parts.push(part);
  this.blob = undefined; // Invalidate the blob
};

MyBlobBuilder.prototype.getBlob = function(contentType) {
  if (!this.blob) {
    this.blob = new Blob(this.parts, { type: contentType });
  }
  return this.blob;
};
