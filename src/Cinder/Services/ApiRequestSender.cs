using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Cinder.Services
{
    public class ApiRequestSender
    {
        public async Task<T> DoRequest<T>(HttpMethod method, string url, object data = null, Dictionary<string, string> headers = null)
        {
            try
            {
                var request = WebRequest.Create(url);
                foreach (var header in headers)
                {
                    request.Headers[header.Key] = header.Value;
                }

                request.Method = method.ToString();
                if (data != null)
                {
                    using (var requestStream = new StreamWriter(await request.GetRequestStreamAsync()))
                    {
                        var serializedData = JsonConvert.SerializeObject(data);
                        await requestStream.WriteAsync(serializedData);
                    }
                }

                var response = await request.GetResponseAsync();
                using (var streamReader = new StreamReader(GetStreamForResponse(response), Encoding.UTF8))
                {
                    var result = streamReader.ReadToEnd();
                    return JsonConvert.DeserializeObject<T>(result);
                }
            }
            catch (WebException exc)
            {
                throw exc;
            }
        }

        private static Stream GetStreamForResponse(WebResponse webResponse)
        {
            Stream stream;
            switch (webResponse.Headers["Content-Encoding"]?.ToUpperInvariant())
            {
                case "GZIP":
                    stream = new GZipStream(webResponse.GetResponseStream(), CompressionMode.Decompress);
                    break;
                case "DEFLATE":
                    stream = new DeflateStream(webResponse.GetResponseStream(), CompressionMode.Decompress);
                    break;
                default:
                    stream = webResponse.GetResponseStream();
                    break;
            }
            return stream;
        }
    }
}
