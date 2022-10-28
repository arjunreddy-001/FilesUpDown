using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Web_API.Data;
using Web_API.Models;
using Web_API.Services;

namespace Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly IFileService _fileService;

        public FileController(IFileService fileService)
        {
            _fileService = fileService;
        }

        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<HttpResponseMessage> UploadFile([FromForm] FileModel request)
        {
            try
            {
                if (await _fileService.UploadFile(request))
                {
                    return new HttpResponseMessage(HttpStatusCode.OK);
                }
                else
                {
                    return new HttpResponseMessage(HttpStatusCode.BadRequest);
                }
            }
            catch (Exception ex)
            {
                return new HttpResponseMessage(HttpStatusCode.InternalServerError)
                {
                    Content = new StringContent(ex.Message),
                };
            }
        }

        [HttpPost("update")]
        public Files UpdateFileMeta(FileEditModel request)
        {
            return _fileService.UpdateFileMeta(request);
        }

        [HttpGet]
        public List<Files> GetAllFiles()
        {
            return _fileService.GetFiles();
        }

        [HttpGet("get/{id}")]
        public Files GetFile(int id)
        {
            return _fileService.GetFile(id);
        }

        [HttpGet("download/{id}")]
        public async Task<IActionResult> DownloadFile(int id)
        {
            var filePath = _fileService.GetFilePath(id);

            var memory = new MemoryStream();

            using (var stream = new FileStream(filePath, FileMode.Open))
            {
                await stream.CopyToAsync(memory);
            }

            memory.Position = 0;
            var contentType = "APPLICATION/octet-stream";
            var fileName = Path.GetFileName(filePath);

            return File(memory, contentType, fileName);
        }
    }
}