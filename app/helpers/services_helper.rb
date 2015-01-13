require 'json'
module ServicesHelper
	def KloudlessList(service_id, folder_id)
		
	    uri = URI("https://api.kloudless.com:443/v0/accounts/"+service_id+"/folders/"+folder_id+"/contents/")

		http = Net::HTTP.new(uri.host, uri.port)
		http.use_ssl = true

		request = Net::HTTP::Get.new(uri.request_uri)
		puts uri.request_uri
		request["Authorization"] = "ApiKey CbdAL_JeRmFRx0ZuxP1wLAzbVv5IeyrVXtdJ1cigadzDOAin"

		response = http.request(request)

		jres = JSON.parse(response.body)

		#type =  jres.class
		#return type

		return jres["objects"]
		#return response.body["objects"][4]
	end



	def recentList(service_id)

	end


	def searchFile(service_id, query)
		uri = URI("https://api.kloudless.com:443/v0/accounts/"+ service_id + "/search/?q="+query)

		http = Net::HTTP.new(uri.host, uri.port)
		http.use_ssl = true

		request = Net::HTTP::Get.new(uri.request_uri)
		puts uri.request_uri
		request["Authorization"] = "ApiKey CbdAL_JeRmFRx0ZuxP1wLAzbVv5IeyrVXtdJ1cigadzDOAin"

		response = http.request(request)

		jres = JSON.parse(response.body)

		#type =  jres.class
		#return type

		return jres["objects"]


	end


end
